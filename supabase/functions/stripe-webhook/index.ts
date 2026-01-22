// supabase/functions/stripe-webhook/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@11.1.0?target=deno"
import { getAdminClient } from "../_shared/utils.ts"

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') ?? '', {
  apiVersion: '2022-11-15',
  httpClient: Stripe.createFetchHttpClient(),
})

serve(async (req) => {
  const signature = req.headers.get('stripe-signature')
  if (!signature) return new Response('No signature', { status: 400 })

  const body = await req.text()

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET') ?? ''
    )

    const supabase = getAdminClient()

    if (event.type === 'invoice.paid') {
      const invoice = event.data.object as any
      const customerEmail = invoice.customer_email

      // Update quota or subscription status
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', customerEmail)
        .single()

      if (profile) {
        await supabase.from('invoices').insert({
          profile_id: profile.id,
          stripe_invoice_id: invoice.id,
          amount_paid: invoice.amount_paid,
          currency: invoice.currency,
          status: 'paid'
        })

        // Upgrade quota to PRO
        await supabase
          .from('quotas')
          .update({ tier: 'pro', max_audits: 100 })
          .eq('profile_id', profile.id)
      }
    }

    return new Response(JSON.stringify({ received: true }), { status: 200 })
  } catch (err) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }
})

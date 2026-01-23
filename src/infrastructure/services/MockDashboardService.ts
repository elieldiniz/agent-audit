import { DashboardData, DashboardService } from "@/application/services/DashboardService";

export class MockDashboardService implements DashboardService {
  async getDashboardData(): Promise<DashboardData> {
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      user: {
        name: "João Silva",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8OkChhqJgPcGuu8HzBMShChv32OeWpNSo_2eSlqwMAL-Rvnrx_R-SKmKaR8NENCG8oV8wYdTW1KINtVIrbUseKk1I4mJ5H9m45fntqZBs82u-rs01uXXEnlRoN82wCfxLcwXsPXGMhHdrTi7ud-8YzVsvhExPRGkNHbVj7ookdD19Hpqhlr1OjOfWuAY5KDbfg9fuyTKDWYlzdq7jI4fLVzHsH8JNQzq-grw9aP2_UlW2i6XHrEqHgAoVbWDxvImK3DxzIjUbaEs",
        plan: "Pro",
        usage: {
          current: 150,
          limit: 200
        }
      },
      stats: {
        safeDependencies: 128,
        riskAlerts: 12,
        criticalFailures: 5,
        aiInsights: 25
      },
      auditStatus: {
        complianceScore: 62,
        approved: 25,
        warnings: 12,
        critical: 5
      },
      recentAlerts: [
        {
          id: '1',
          type: 'warning',
          title: 'Dependência Desatualizada',
          message: 'Atualização Requerida',
          time: 'Há 15 min'
        },
        {
          id: '2',
          type: 'error',
          title: 'Falha de Segurança Detectada',
          message: 'Risco Crítico',
          time: 'Há 1 h'
        },
        {
          id: '3',
          type: 'info',
          title: 'Configuração Imprópria',
          message: 'Ajuste Necessário',
          time: 'Há 3 h'
        }
      ],
      analyzedDependencies: [
        {
          name: 'react',
          version: '17.0.2',
          status: 'healthy',
          lastCheck: 'Hoje'
        },
        {
          name: 'lodash',
          version: '4.17.21',
          status: 'warning',
          lastCheck: 'Ontem'
        },
        {
          name: 'express',
          version: '4.16.4',
          status: 'critical',
          lastCheck: 'Há 2 dias'
        }
      ],
      latestInsight: {
        title: "Otimização Recomendada",
        description: "Identificamos uma função de código que pode ser otimizada para melhorar a performance do sistema através do refactoring de dependências."
      }
    };
  }
}

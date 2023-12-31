using Finance.Services;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace Finance.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LandingPageController : ControllerBase
    {
        private readonly DespesaService _despesaService;
        private readonly ReceitaService _receitaService;

        public LandingPageController(DespesaService despesaService, ReceitaService receitaService)
        {
            _despesaService = despesaService;
            _receitaService = receitaService;
        }

        [HttpGet("saldo")]
        public async Task<IActionResult> GetSaldo(CancellationToken cancellationToken)
        {
            try
            {
                var somaDespesas = await _despesaService.SomaDespesaAsync(cancellationToken);
                var somaReceitas = await _receitaService.SomaReceitaAsync(cancellationToken);
                var saldo = somaReceitas - somaDespesas;
                var somaDespesasMensais = await _despesaService.GetDespesaMensalAsync(cancellationToken);
                var somaReceitasMensais = await _receitaService.GetReceitaMensalAsync(cancellationToken);

                return Ok(new { 
                    SomaDespesas = somaDespesas,
                    SomaReceitas = somaReceitas,
                    Saldo = saldo,
                    SomaDespesaMensal = somaDespesasMensais,
                    SomaReceitaMensal = somaReceitasMensais,
                });
            }
            catch (Exception ex)
            {
                return BadRequest($"Erro ao calcular o saldo: {ex.Message}");
            }
        }
    }
}

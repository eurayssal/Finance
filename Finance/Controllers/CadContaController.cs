using Finance.Models;
using Finance.Services;
using Microsoft.AspNetCore.Mvc;

namespace Finance.Controllers
{
    [ApiController]
    [Route("api/cadconta")]
    public class CadContaController : ControllerBase
    {
        private readonly CadContaService _cadContaService;

        public CadContaController(CadContaService cadContaSerce)
        {
            _cadContaService = cadContaSerce;
        }

        [HttpGet]
        public async Task<ActionResult<List<CadConta>>> GetContas()
        {
            var contas = await _cadContaService.GetAsync();
            return Ok(contas);
        }

        [HttpPost]
        public async Task<ActionResult<CadConta>> PostConta(CadConta newCadConta)
        {
            await _cadContaService.CreateAsync(newCadConta);
            return CreatedAtAction(nameof(GetContas), new { id = newCadConta.Id }, newCadConta);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, CadConta updateCadConta)
        {
            var conta = await _cadContaService.GetAsync(id);

            if (conta == null)
            {
                return NotFound();
            }

            conta.Nome = updateCadConta.Nome;
            conta.Saldo = updateCadConta.Saldo;
            conta.Tipo = updateCadConta.Tipo;
            conta.Atividade = updateCadConta.Atividade;

            await _cadContaService.UpdateAsync(id, conta);

            return Ok(new
            {
                conta.Nome,
                conta.Saldo,
                conta.Tipo,
                conta.Atividade
            });
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> DeleteConta(string id)
        {
            var conta = await _cadContaService.GetAsync(id);

            await _cadContaService.RemoveAsync(id);

            return NoContent();
        }
    }
}

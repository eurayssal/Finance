using Finance.Models;
using Finance.Services;
using Microsoft.AspNetCore.Mvc;

namespace Finance.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReceitaController : ControllerBase
    {
        private readonly ReceitaService _receitaService;
        
        public ReceitaController(ReceitaService receitaService)
        {
            _receitaService = receitaService;

        }

        [HttpGet]
        public async Task<List<Receita>> Get() =>
            await _receitaService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Receita>> Get(string id)
        {
            var receita = await _receitaService.GetAsync(id);

            return receita;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Receita newReceita)
        {
            await _receitaService.CreateAsync(newReceita);

            return CreatedAtAction(nameof(Get), new {id = newReceita.Id}, newReceita);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Receita updateReceita)
        {
            var receita = await _receitaService.GetAsync(id);

            receita.Nome = updateReceita.Nome;
            receita.Valor = updateReceita.Valor;
            receita.CartaoName = updateReceita.CartaoName;
            receita.CartaoId = updateReceita.CartaoId;

            await _receitaService.UpdateAsync(id, receita);

            return Ok(new
            {
                receita.Id,
                receita.Nome,
                receita.Valor,
            });
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var receita = await _receitaService.GetAsync(id);

            if (receita == null)
            {
                return NotFound();
            }

            await _receitaService.RemoveAsync(id);

            return NoContent();
        }

        [HttpGet("soma")]
        public async Task<IActionResult> GetSomaReceitas(CancellationToken cancellationToken)
        {
            try
            {
                var somaReceita = await _receitaService.SomaReceitaAsync(cancellationToken);

                return Ok(new { SomaReceita = somaReceita });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Erro ao calcular a soma das receitas: {ex.Message}");
            }
        }
    }
}

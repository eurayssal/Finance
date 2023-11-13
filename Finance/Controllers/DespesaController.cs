using Finance.Models;
using Finance.Services;
using Microsoft.AspNetCore.Mvc;

namespace Finance.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DespesaController : ControllerBase
    {
        private readonly DespesaService _despesaService;

        public DespesaController(DespesaService despesaService) =>
            _despesaService = despesaService;

        [HttpGet]
        public async Task<List<Despesa>> Get() =>
            await _despesaService.GetAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Despesa>> Get(string id)
        {
            var despesa = await _despesaService.GetAsync(id);

            if (despesa == null)
            {
                return NotFound();
            }
            return despesa;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Despesa newDespesa)
        {
            await _despesaService.CreateAsync(newDespesa);

            return CreatedAtAction(nameof(Get), new { id = newDespesa.Id }, newDespesa);
        }

        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Despesa updatedDespesa)
        {
            var despesa = await _despesaService.GetAsync(id);

            if (despesa is null)
            {
                return NotFound();
            }

            despesa.DespesaNome = updatedDespesa.DespesaNome;
            despesa.Valor = updatedDespesa.Valor;

            await _despesaService.UpdateAsync(id, despesa);

            return Ok(new
            {
                despesa.Id,
                despesa.DespesaNome,
                despesa.Valor
            });
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var despesa = await _despesaService.GetAsync(id);

            if (despesa == null)
            {
                return NotFound();
            }

            await _despesaService.RemoveAsync(id);

            return NoContent();
        }
    }
}

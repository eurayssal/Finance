using Finance.Models;
using Finance.ViewModels;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Finance.Services
{
    public class DespesaService
    {
        private readonly IMongoCollection<Despesa> _despesaCollection;

        public DespesaService(IOptions<FinanceDatabaseSettings> financeDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                financeDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                financeDatabaseSettings.Value.DatabaseName);

            _despesaCollection = mongoDatabase.GetCollection<Despesa>("despesa");
        }

        public async Task<List<Despesa>> GetAsync()
        {
            return await _despesaCollection.Find(x => true)
                .SortByDescending(x => x.Data)
                .ToListAsync();
        }
        public async Task<Despesa?> GetAsync(string id) =>
            await _despesaCollection.Find(y => y.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(DespesaViewModel newDespesa, CadConta cadConta)
        {
            var despesa = new Despesa();
            despesa.Nome = newDespesa.Nome;
            despesa.Data = newDespesa.Data;
            despesa.Valor = newDespesa.Valor;
            despesa.ContaId = cadConta.Id;
            despesa.ContaName = cadConta.Nome;
            await _despesaCollection.InsertOneAsync(despesa);
        }

        public async Task UpdateAsync(string id, DespesaViewModel despesaViewModel, CadConta cadConta)
        {
            var despesa = await GetAsync(id);

            despesa.Nome = despesaViewModel.Nome;
            despesa.Valor = despesaViewModel.Valor;
            despesa.Data = despesaViewModel.Data;
            despesa.ContaId = despesaViewModel.ContaId;
            despesa.ContaName = cadConta.Nome;

            await _despesaCollection.ReplaceOneAsync(x => x.Id == id, despesa);
        }

        public async Task RemoveAsync(string id) =>
            await _despesaCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<decimal> SomaDespesaAsync(CancellationToken cancellationToken)
        {
            var despesas = await _despesaCollection.Find(x => true).ToListAsync(cancellationToken);

            decimal somaDespesas = despesas.Sum(s => s.Valor);

            return somaDespesas;
        }

    }
}


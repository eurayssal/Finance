using Finance.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Finance.Services
{
    public class ReceitaService
    {
        private readonly IMongoCollection<Receita> _receitaCollection;

        public ReceitaService(IOptions<FinanceDatabaseSettings> financeDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                financeDatabaseSettings.Value.ConnectionString);

            var mongoDataBase = mongoClient.GetDatabase(
                financeDatabaseSettings.Value.DatabaseName);

            _receitaCollection = mongoDataBase.GetCollection<Receita>("receita");
        }

        public async Task<List<Receita>> GetAsync() =>
         await _receitaCollection.Find(x => true).ToListAsync();

        public async Task<Receita?> GetAsync(string id) =>
            await _receitaCollection.Find(y => y.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Receita newReceita) =>
            await _receitaCollection.InsertOneAsync(newReceita);

        public async Task UpdateAsync(string id, Receita updatedReceita) =>
       await _receitaCollection.ReplaceOneAsync(x => x.Id == id, updatedReceita);

        public async Task RemoveAsync(string id) =>
            await _receitaCollection.DeleteOneAsync(x => x.Id == id);

        public async Task<decimal> SomaReceitaAsync(CancellationToken cancellationToken)
        {
            var receitas = await _receitaCollection.Find(x => true).ToListAsync(cancellationToken);

            decimal somaReceitas= receitas.Sum(s => s.Valor);

            return somaReceitas;
        }
        public async Task<decimal> GetReceitaMensalAsync(CancellationToken cancellationToken)
        {
            var hoje = DateTime.Today;
            var inicio = new DateTime(hoje.Year, hoje.Month, 1);
            var final = inicio.AddMonths(1).AddDays(-1);

            var receitas = await _receitaCollection.Find(x => x.Data >= inicio && x.Data <= final).ToListAsync(cancellationToken);
            var valor = receitas.Sum(sum => sum.Valor);

            return valor;
        }
    }
}

using Finance.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Finance.Services
{
    public class DespesaService
    {
        private readonly IMongoCollection<Despesa> _despesaCollection;

        public DespesaService(IOptions<DespesaDatabaseSettings> despesaDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                despesaDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                despesaDatabaseSettings.Value.DatabaseName);

            _despesaCollection = mongoDatabase.GetCollection<Despesa>(
                despesaDatabaseSettings.Value.DespesaCollectionName);
        }

        public async Task<List<Despesa>> GetAsync() =>
        await _despesaCollection.Find(x => true).ToListAsync();

        public async Task<Despesa?> GetAsync(string id) =>
            await _despesaCollection.Find(y => y.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Despesa newDespesa) =>
        await _despesaCollection.InsertOneAsync(newDespesa);

        public async Task UpdateAsync(string id, Despesa updatedDespesa) =>
        await _despesaCollection.ReplaceOneAsync(x => x.Id == id, updatedDespesa);

        public async Task RemoveAsync(string id) =>
            await _despesaCollection.DeleteOneAsync(x => x.Id == id);
    }
}


using Finance.Models;
using Microsoft.Extensions.Options;
using Finance.Controllers;
using MongoDB.Driver;

namespace Finance.Services
{
    public class CadContaService
    {
        private readonly IMongoCollection<CadConta> _cadContaCollection;

        public CadContaService (
            IOptions<FinanceDatabaseSettings> financeDatabaseSettings)
        {
            var mongoClient = new MongoClient(
                financeDatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                financeDatabaseSettings.Value.DatabaseName);

            _cadContaCollection = mongoDatabase.GetCollection<CadConta>("cadconta");
        }

        public async Task<List<CadConta>> GetAsync() =>
            await _cadContaCollection.Find(x => true).ToListAsync();

        public async Task<CadConta?> GetAsync(string id) =>
            await _cadContaCollection.Find(y => y.Id == id).FirstOrDefaultAsync();

        public async Task UpdateAsync(string id, CadConta updateCadConta)
        {
            await _cadContaCollection.ReplaceOneAsync(x => x.Id == id, updateCadConta);
        }
        public async Task CreateAsync(CadConta newCadConta)
        {
            await _cadContaCollection.InsertOneAsync(newCadConta);
        }

        public async Task RemoveAsync(string id) =>
            await _cadContaCollection.DeleteOneAsync(x => x.Id == id);
    }
}

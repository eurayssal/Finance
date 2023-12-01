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

        public async Task CreateAsync(DespesaViewModel newDespesa, CadConta cadConta, CadCartao cadCartao, bool isCartao)
        {
            var despesa = new Despesa();

            despesa.Nome = newDespesa.Nome;
            despesa.Data = newDespesa.Data;
            despesa.Valor = newDespesa.Valor;
            despesa.Status = newDespesa.Status;

            //Se eu selecionei uma conta não é um cartão.
            //Se meu cartão está null o id que eu recebo eu lanço ele no conta

            if (isCartao)
            {
                despesa.CartaoId = cadCartao.Id;
                despesa.CartaoName = cadCartao.Nome;
            }
            else
            {
                despesa.ContaId = cadConta.Id;
                despesa.CartaoName = cadConta.Nome;
            }

            await _despesaCollection.InsertOneAsync(despesa);
        }

        public async Task UpdateAsync(string id, DespesaViewModel despesaView, CadConta cadConta, CadCartao cadCartao, bool isCartao)
        {
            var despesa = await GetAsync(id);

            var cartaoId = cadCartao.Id;
            var contaId = cadConta.Id;

            despesa.Nome = despesaView.Nome;
            despesa.Valor = despesaView.Valor;
            despesa.Data = despesaView.Data;
            despesa.Status = despesaView.Status;


            //Se antes eu tinha cart 

            if (isCartao)
            {
                despesa.CartaoId = cadCartao.Id;
                despesa.CartaoName = cadCartao.Nome;

                despesa.ContaId = null;
                despesa.ContaName = null;
            }
            else
            {
                despesa.ContaId = cadConta.Id;
                despesa.ContaName = cadConta.Nome;

                despesa.CartaoId = null;
                despesa.CartaoName = null;
            }

            

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

        public async Task<decimal> GetDespesaMensalAsync(CancellationToken cancellationToken)
        {
            var hoje = DateTime.Today;
            
            var inicio = new DateTime(hoje.Year, hoje.Month, 1);
            var final = inicio.AddMonths(1).AddDays(-1);

            var despesas = await _despesaCollection.Find(x => x.Data >= inicio && x.Data <= final).ToListAsync(cancellationToken);

            var valor = despesas.Sum(sum => sum.Valor);

            return valor;
        }
    }
}


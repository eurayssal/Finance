using MongoDB.Bson.Serialization.Attributes;

namespace Finance.ViewModels
{
    public class CadCartaoCreateViewModel
    {
        //Tudo o que o front precisa
        //obs: a fatura vem do back nao é poassada aqui
        public string? Nome { get; set; }
        public string Tipo { get; set; }
        public decimal ValorFatura { get; set; }
        public DateTime DiaFechamento { get; set; }
        public DateTime DiaVencimento { get; set; }
        public bool Atividade { get; set; }
    }
}

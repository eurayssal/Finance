namespace Finance.ViewModels
{
    public class DespesaViewModel
    {
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public bool Status { get; set; }

        //Eu recebo um id e um tipo
        public string ContaCartaoId { get; set; }
    }
}

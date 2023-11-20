namespace Finance.ViewModels
{
    public class DespesaViewModel
    {
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public bool Status { get; set; }
        public string ContaId { get; set; }
        public string CartaoId { get; set; }
    }
}

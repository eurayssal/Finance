using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Finance.Models
{
    public class MovOrcamento
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public DateTime Periodo{ get; set; } // Periodo é mensal sempre
        public decimal DespesaValor { get; set; } // Valor gasto
        public double LimiteDeGasto { get; set; }
        public string CategoriaName { get; set; }
        public string CategoriaId { get; set; }
    }
}

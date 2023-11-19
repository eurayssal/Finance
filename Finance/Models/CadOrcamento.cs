using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Finance.Models
{
    public class CadOrcamento
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Nome { get; set; }
        public DateTime Periodo{ get; set; }
        public string Categoria { get; set;}
        public decimal ValorGasto { get; set; }
        public double LimiteDeGasto { get; set; }
    }
}

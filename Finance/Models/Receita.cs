using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Finance.Models
{
    public class Receita
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("Nome")]
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
        public bool Status { get; set; }
        public string Categoria { get; set; }
        public DateTime Repeticao { get; set; }

        // Vai ser no mesmo select

        public string ContaId { get; set; }
        public string ContaName { get; set; }
    }
}

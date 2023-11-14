using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Finance.Models
{
    public class Despesa
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("Nome")]
        public string Nome { get; set; }
        public decimal Valor { get; set; }
        public DateTime Data { get; set; }
    }
}

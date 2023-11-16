using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Finance.Models
{
    public class CadConta
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Nome")]
        public string? Nome { get; set; }

        [BsonElement("Saldo")]
        public decimal Saldo { get; set; }
    }
}

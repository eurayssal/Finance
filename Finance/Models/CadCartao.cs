using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace Finance.Models
{
    public class CadCartao
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("Nome")]
        public string? Nome{ get; set; }
        public string Tipo { get; set; }
        public DateTime DiaFechamento { get; set; }
        public DateTime DiaVencimento { get; set; }
        public decimal ValorFatura { get; set; }
        public bool Atividade { get; set; }
    }
}

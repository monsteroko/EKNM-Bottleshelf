using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    /// <summary>
    /// EF model of liquid components in cocktails
    /// </summary>
    [Table("LiquidsTable")]
    public class LiquidsTable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public int Id { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        [JsonProperty("cockId")]
        public int CockId { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        [JsonProperty("liqId")]
        public int LiqId { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        [JsonProperty("amount")]
        public int Amount { get; set; }
    }
}

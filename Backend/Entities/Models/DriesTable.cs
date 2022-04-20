using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    /// <summary>
    /// EF model of dry components in cocktails
    /// </summary>
    [Table("DriesTable")]
    public class DriesTable
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty("id")]
        public int Id { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        [JsonProperty("cockid")]
        public int CockId { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        [JsonProperty("dryid")]
        public int DryId { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        [JsonProperty("amount")]
        public int Amount { get; set; }
    }
}

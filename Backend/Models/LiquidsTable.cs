using Microsoft.EntityFrameworkCore;
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
        public int Id { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        public int CockId { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        public int LiqId { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        public int Amount { get; set; }
    }
}

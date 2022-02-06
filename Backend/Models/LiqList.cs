using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    [Table("LiqList")]
    public class LiqList
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        [Column(TypeName = "integer"), Range(0, double.MaxValue)]
        public int CockId { get; set; }
        [Column(TypeName = "integer"), Range(0, double.MaxValue)]
        public int LiqId { get; set; }
        [Column(TypeName = "integer"), Range(0, double.MaxValue)]
        public int Amount { get; set; }
    }
}

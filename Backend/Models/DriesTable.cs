using Microsoft.EntityFrameworkCore;
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
        public int Id { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        public int CockId { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        public int DryId { get; set; }
        [Column(TypeName = "integer"), Range(0, int.MaxValue)]
        public int Amount { get; set; }
    }
}

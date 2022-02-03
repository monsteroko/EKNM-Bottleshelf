using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    [Table("Dries")]
    public class Dry: Ingridient
    {
        [Range(0,double.MaxValue)]
        public int? Weight { get; set; }
    }
}

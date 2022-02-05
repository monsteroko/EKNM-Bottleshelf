using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EKNM_Bottleshelf.Models
{
    public class DryList
    {
        [Column(TypeName = "integer"), Range(0, double.MaxValue)]
        public int CockId { get; set; }
        [Column(TypeName = "integer"), Range(0, double.MaxValue)]
        public int DryId { get; set; }
        [Column(TypeName = "integer"), Range(0, double.MaxValue)]
        public int Amount { get; set; }
    }
}

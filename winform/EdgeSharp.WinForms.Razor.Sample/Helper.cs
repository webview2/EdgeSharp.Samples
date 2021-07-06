using System.Drawing;
using System.Windows.Forms;

namespace EdgeSharp.WinForms.Razor.Sample
{
    public static class Helper
    {
        public static void SetAppIcon(this Form form)
        {
            var executable = System.Reflection.Assembly.GetExecutingAssembly();
            var iconStream = executable.GetManifestResourceStream("EdgeSharp.WinForms.Razor.Sample.edgesharp.ico");
            if (iconStream != null)
            {
                form.Icon = new Icon(iconStream);
            }
        }
    }
}

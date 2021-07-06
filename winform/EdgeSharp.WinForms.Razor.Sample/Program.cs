using EdgeSharp.Core;
using System;
using System.Windows.Forms;

namespace EdgeSharp.WinForms.Razor.Sample
{
    static class Program
    {
        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            var appBuilder = new OwinAppBuilder<Startup>();
            ServiceLocator.Bootstrap(appBuilder);

            var bowserForm = (BrowserForm)ServiceLocator.Current.GetInstance<IBrowserWindow>();
            Application.Run(bowserForm);

           //Application.Run(new Form1());

            appBuilder?.Stop();
        }
    }
}

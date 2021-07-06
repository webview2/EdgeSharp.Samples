using EdgeSharp.Core;
using System.Windows;

namespace EdgeSharp.Wpf.RazorPages.Sample
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        private OwinAppBuilder<Startup> _owinAppBuilder;
        protected override void OnStartup(StartupEventArgs e)
        {
            _owinAppBuilder = new OwinAppBuilder<Startup>();
            ServiceLocator.Bootstrap(_owinAppBuilder);

            //MainWindow mainWindow = new MainWindow();
            SampleWindow mainWindow = new SampleWindow();
            mainWindow.Show();
        }

        protected override void OnExit(ExitEventArgs e)
        {
            _owinAppBuilder?.Stop();

            base.OnExit(e);
        }
    }
}

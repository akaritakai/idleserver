using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
 
namespace IdleAnnouncer
{
  class IdleAnnouncer
  {

    public static readonly TimeSpan ONE_MINUTE = new TimeSpan(0, 1, 0);

    static void Main(string[] args)
    {
      hideWindow();

      IdleTester tester = new IdleTester();
      while (true) {
        IdleTransmitter.Transmit(tester.WasIdle());
        Thread.Sleep(ONE_MINUTE);
      }
    }

    private static void hideWindow()
    {
      String title = Guid.NewGuid().ToString();
      Console.Title = title;
      IntPtr hWnd = AnnouncerNativeMethods.FindWindow(null, title);
      if (hWnd != IntPtr.Zero) {
        AnnouncerNativeMethods.ShowWindow(hWnd, 0);
      }
    }
  }

  internal static class AnnouncerNativeMethods
  {
    [DllImport("User32.dll", CharSet=CharSet.Unicode)]
    internal static extern IntPtr FindWindow(string lpClassName, string lpWindowName);

    [DllImport("User32.dll")]
    internal static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);
  }

}

import java.net.InetAddress;
import java.net.InetSocketAddress;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

public class HttpServer {

  public static void main(String[] args) {
    try {
          final InetAddress localhost = InetAddress.getByAddress(new byte[] {127, 0, 0, 1});
          final int port = 8080;

          final Server server = new Server(new InetSocketAddress(localhost, port));
          final ServletContextHandler context = new ServletContextHandler();
          context.setContextPath("/");
          context.addServlet(new ServletHolder(new IdleServlet()), "/*");
          server.setHandler(context);

          server.start();
          server.join();
    } catch (Exception e) { }

}

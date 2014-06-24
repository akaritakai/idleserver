import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
@SuppressWarnings("serial")
public class IdleServlet extends HttpServlet {

  private long lastTime = System.currentTimeMillis();

  protected void doGet(HttpServletRequest request, HttpServletResponse response) {
    try {
      response.setStatus(HttpServletResponse.SC_OK);
      response.setContentType("text/plain");
      response.getWriter().print(lastTime);
      response.getWriter().flush();
    } catch (Exception e) { }
  }

  protected void doPost(HttpServletRequest request, HttpServletResponse response) {
    String idleStr = request.getParameter("idle");
    if (idleStr != null && idleStr.equals("false")) {
      lastTime = System.currentTimeMillis();
    }
  }

}

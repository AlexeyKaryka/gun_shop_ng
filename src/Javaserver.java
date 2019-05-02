package javaserversimple;
   import java.io.*;
   import java.net.*;
   public class JavaServerSimple {
       public static int PORT=8013;
       public static void main(String[] args) {
           ServerSocket s=null;
           try
           {
            s= new ServerSocket(PORT);
           }
           catch (Exception e1)
           {
    System.out.println("Ended with error:"+e1.getMessage());
             System.exit(-1);
          }
             System.out.println("Server started");
             try
             {
               Socket sock =s.accept();
BufferedReader in= new BufferedReader (new InputStreamReader(sock.getInputStream())); //  буфферизованный поточный объект
PrintWriter out = new PrintWriter(new BufferedWriter(new
   OutputStreamWriter(sock.getOutputStream())),true);
               while(true)                              // осн цикл серверного приложения
               {
                 String str=in.readLine();
                 if(str.equals("END"))
                     break;
                 if(str.trim().toLowerCase().equals("dollar"))
                 {
                     out.println("server: --  15000 Blr");
} else
                  if(str.trim().toLowerCase().equals("euro"))
                 {
                     out.println("server: ---  17000 Blr");
                 }
else
  out.println("server: not found correct solution to request!");
               }
             }
          catch(Exception e2)
{
}
try {
s.close(); }
            catch(Exception e3)
            {
            System.out.println("Cannot normally
  close:"+e3.getMessage());
} }
}

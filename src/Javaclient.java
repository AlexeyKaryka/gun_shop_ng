package javaclientsimple;
  import java.net.*;
  import java.io.*;
  import java.util.Scanner;
  public class JavaClientSimple {
       public static void main(String[] args) {
              Socket sock=null;
try
{
InetAddress addr = InetAddress.getByName(null); System.out.println("address="+addr);
sock= new Socket(addr,8013);
BufferedReader in = new BufferedReader( new
InputStreamReader(sock.getInputStream()));
PrintWriter out = new PrintWriter(new
   BufferedWriter(new
   OutputStreamWriter(sock.getOutputStream())),true);
          Scanner scanner = new Scanner(System.in);
                   String ename;
       System.out.println("Enter currency: dollar  or  euro ");
ename= scanner.nextLine();
       //This is needed to pick up the new line
               out.println(ename);
               String answer=in.readLine();
               System.out.println(answer);
               out.println("END");
               System.out.println("The END");
               throw new Exception();
}
           catch(Exception e)
           {
try
               {
               sock.close();
               }
               catch(Exception e4)
               {
}
} }
}

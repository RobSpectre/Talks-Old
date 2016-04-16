import BaseHTTPServer
import SimpleHTTPServer
import SocketServer
import base64
import argparse
 
key = ""
 
class AuthHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):
    ''' Main class to present webpages and authentication. '''
    def do_HEAD(self):
        print "send header"
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
 
    def do_AUTHHEAD(self):
        print "send header"
        self.send_response(401)
        self.send_header('WWW-Authenticate', 'Basic realm=\"Test\"')
        self.send_header('Content-type', 'text/html')
        self.end_headers()
 
    def do_GET(self):
        global key
        ''' Present frontpage with user authentication. '''
        if self.headers.getheader('Authorization') == None:
            self.do_AUTHHEAD()
            self.wfile.write('no auth header received')
            pass
        elif self.headers.getheader('Authorization') == 'Basic '+key:
            SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
            pass
        else:
            self.do_AUTHHEAD()
            self.wfile.write(self.headers.getheader('Authorization'))
            self.wfile.write('not authenticated')
            pass
 
def auth(HandlerClass = AuthHandler,
         ServerClass = BaseHTTPServer.HTTPServer):
    BaseHTTPServer.test(HandlerClass, ServerClass)
 

parser = argparse.ArgumentParser(description="Twilio Reveal Template - launch a Twilio "
                                             "Reveal presentation with or without basic "
                                             "authentication.",
                                 epilog="Written by Rob Spectre - "
                                        "http://www.brooklynhacker.com")
parser.add_argument('port', type=int,
                    help="Port to use for the HTTP server.")
parser.add_argument('-u', '--username',
                    help="Username to use for basic authentication.")
parser.add_argument('-p', '--password',
                    help="Password to use for basic authentication.")
 
if __name__ == '__main__':
    args = parser.parse_args()    
    
    if args.username and args.password:
        key = base64.b64encode("{0}:{1}".format(args.username, args.password))
        auth()
    else:
        Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
        httpd = SocketServer.TCPServer(("", args.port), Handler)
        print("Running on PORT {0}".format(args.port))
        httpd.serve_forever()

<?php
// /////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////

// N.B. This should probably go somewhere else in a separate file; but
// for brevity...this works

	class PostageApp{

		private $config;

	//
	// This is our constructor function that runs whenever you create a new instance
	// of this class.
	//
	// For now, we'll make the config data "global" here...
	//
		function __construct(){
			//
			// Open our config file, and turn it into a PHP object
			// (no error handling because...fuggit...)
			//
			$this->config = json_decode(file_get_contents("C:/phpconf/training/config.json"),true);
		}


	//
	// Quick and dirty function to build out the JSON
	// we're going to send to postage-app (which sends e-mails)
	//
		private function build_mail($recipients, $subject, $from, 
			$content = false, 
			$attachments = false, 
			$template = false,
			$variables = false	
		){
			
			// Body of request
			$body = array();
			
			$body["api_key"] = $this->config["postage-app"]["api-key"];
			$body["uid"] = md5(random_int(1,100000));
			$body["arguments"] = array(
				"recipients" => $recipients,
				"headers" => array(
					"subject" => $subject,
					"from" => $from
				)
			);
			
			if($content){
				$body["arguments"]["content"] = $content;
			}
			
			if($attachments){
				$body["arguments"]["attachments"] = $attachments;
			}
			
			if($template){
				$body["arguments"]["template"] = $template;
			}
			
			if($variables){
				$body["arguments"]["variables"] = $variables;
			}
			//
			// Send it and return whatever it gives up...
			//
			return $this->send_mail($body);
		}
		
		
	//
	// This is what actually sends data across the wire...
	// we're going to send to postage-app (which sends e-mails)
	//
		private function send_mail($body){
			
			// encode our data for transport
			$post_data = json_encode($body);
			
			// This is the address we want to send our data to
			$crl = curl_init("https://api.postageapp.com/v.1.1/send_message");
			
			// ???
			curl_setopt($crl, CURLOPT_RETURNTRANSFER, true);
			
			// ???
			curl_setopt($crl, CURLINFO_HEADER_OUT, true);
			
			// We're posting data so we need to send it as such
			curl_setopt($crl, CURLOPT_POST, true);
			
			// This is the acutal data we're sendign
			curl_setopt($crl, CURLOPT_POSTFIELDS, $post_data);

			// Set HTTP Header for POST request 
			curl_setopt($crl, CURLOPT_HTTPHEADER, array(
			  'Content-Type: application/json',
			  'Content-Length: ' . strlen($post_data))
			);

			// ...SEND IT!
			$result = curl_exec($crl);

			// handle curl error
			if ($result === false) {
				//
				// Return the error we got
				//
				return json_encode('Curl error: ' . curl_error($crl));
			} else {
				//
				// k.i.s.s: return what we got
				//
				return($result);
			}
			// Close cURL session handle
			curl_close($crl);
		}
		
		
		
	//
	// Publically accessable interface to the class.
	// This is what developers can use without worrying about the rest
	// of the class and its innards
	//
		public function send($recipients, $subject, $from, 
			$content = false, 
			$attachments = false, 
			$template = false,
			$variables = false	
		){
			$this->build_mail($recipients, $subject, $from, $content,$attachments,$template,$variables);
		}
	}



// /////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////
// /////////////////////////////////////////////////////////////////////////










	//
	// So here's what we're trying to do here:
	// 
	// We want to know that the user who came to this page
	// owns the e-mail they say that they own. Here's how we do it:
	//
	// 1.) Create a random number and leave it with the client in their
	//     Session
	//
	// 2.) E-Mail them with a hash of that random number PLUS our
	//     Secret Key (in the form of a link with a query string)
	//
	//     (e.g. http://example.com/validate?hash=k3y804RDC4T)
	//
	// 3.) When the client clicks that link, our server will take
	//     the random number in the client's session, combine it 
	//     with our secret-key and if it's hash equals what the client
	//     gave us; mark them as valid
	//
	// 4.) This sounds way more complicated than it really is. Its not
	//     that bad.
	//



	session_start();

	$config = json_decode(file_get_contents("C:/phpconf/training/config.json"),true);


//
// THEY GAVE US AN E-MAIL ADDRESS
// SO THEY MUST WANT TO SEND OUT AN E-MAIL
// SO THEY CAN GET IN
//
	if(isset($_POST["inputEmail"])){
		//
		// Load a bunch of variables into the user's session
		//
		$_SESSION["email-address"] = strtolower($_POST["inputEmail"]);
	
		$_SESSION["validation-status"] = "pending";
		
		$_SESSION["validation-salt"] = md5(random_int(1,100000));

		// This is what we'll send in our e-mail for them to click...
		$hash = md5($config["validation-key"] . "" . $_SESSION["validation-salt"]);

		// So it looks like we've made it through everything and nobody's shat themselves...super!
		//
		// Let's try sending the user an e-mail
		//
		$mailer = new PostageApp();
		
		$mail = $mailer->send(
			array($_SESSION["email-address"]), 
			"Here Is Your Validation Link...", 
			$config["postage-app"]["e-mail-sender"], 
			false,
			false,
			"ez_template",
			array(
				"link" => $config["root-url"] . "/validate?hash=" . $hash
			)
		);
		
	}
		
error_log(json_encode($_GET));
		
//
// THEY GAVE A HASH
// HOORAY! THEY MUST WANT TO BE VALIDATED
//
	if(isset($_GET["hash"])){
		$hash = $_GET["hash"];
		//
		// Quick check that math works
		//
		if(md5($config["validation-key"] . "" . $_SESSION["validation-salt"]) == $hash){
			//
			// we're good to go...
			//
			$_SESSION["validation-status"] = "valid";
			//
			//
		} else {
			//
			// Nothing needs to happen...
			//
		}
	}
		
		
	
	header("Location: /training/");
	
	

?>
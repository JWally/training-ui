<?php

	//
	// Custom functino to recursively a directory
	// source: https://stackoverflow.com/questions/34190464/php-scandir-recursively
	//
	function scanAllDir($dir) {
	  $result = [];
	  foreach(scandir($dir) as $filename) {
		if ($filename[0] === '.') continue;
		$filePath = $dir . '/' . $filename;
		if (is_dir($filePath)) {
		  foreach (scanAllDir($filePath) as $childFilename) {
			$result[] = $filename . '/' . $childFilename;
		  }
		} else {
		  $result[] = $filename;
		}
	  }
	  return $result;
	}

	//
	// Store all file names in an array
	//
	$fileArray = scanAllDir(__DIR__ . "/../src/templates");
	$newFileArray = array();
	
	//
	// Open each file, and store it in an associative array
	// where the key is its relative location
	//
	forEach($fileArray as $key => $val){
		$newFileArray[$val] = file_get_contents(__DIR__ . "/../src/templates/" . $val);
	}
	
	
	//
	// Create a JSON file where all of the templates
	// are stored
	//
	file_put_contents(__DIR__ . "/../src/templates.js", "window.templates = " . json_encode($newFileArray, JSON_PRETTY_PRINT));





?>
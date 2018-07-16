#!/usr/bin/env python
# -*- coding:utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from subprocess import call
import sys
import os 
import time 
import re
import urllib2
import urllib
import requests
import json
import testcases

# Global variables for test settings
global amazon_page
amazon_page = "file:///Users/apple/Downloads/Testcases/am.htm" # Path of local Amazon page

global amazon_title
amazon_title = "//h2[1]"

global amazon_price
amazon_price = "//span[@class='sx-price sx-price-large']"


def prepare_filters(pb, field):
	pb.find_element_by_xpath(field).click()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//i[@id='cap_toggle']").click()

def execute_sikuli(pb):
	call(["/Users/apple/Downloads/runsikulix", "-r", "/Users/apple/Downloads/Testcases/startExtension.sikuli"]) # Path of sikulix and sikuli script
	try:
		wait = WebDriverWait(pb, 20).until(EC.presence_of_element_located((By.ID, "webdataview-floating-widget")))
	except Exception:
		print "Web-Data-View is not enabled."
		pb.quit()
		sys.exit()

def go_to_page(pb, page):
	pb.get(page)

def reset(pb, page, field):
	go_to_page(pb, page)
	execute_sikuli(pb)
	prepare_filters(pb, field)
	if field == amazon_price:
		pb.find_element_by_xpath("//i[@id='web-view-expand-selection']").click()
		pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
		pb.find_element_by_xpath("//i[@id='cap_toggle']").click()

def main():
	raw_input("\nPress any key to start the default test on Chrome Extension: Web-Data-View...\n")

	# Start Chrome with Web-Data-View
	executable_path = "/usr/local/bin/chromedriver"	# Path of chromedriver
	os.environ["webdriver.chrome.driver"] = executable_path
	chrome_options = webdriver.ChromeOptions()
	chrome_options.add_argument("load-extension=/Users/apple/Downloads/refactor/Web-Data-View/ng-dashboard")	# Path of Web-Data-View to be tested
	page_bot = webdriver.Chrome(executable_path = executable_path, chrome_options = chrome_options)

	# Set the page and field to test
	target_page = amazon_page
	target_field = amazon_title
	field_option = ""
	if target_field == amazon_title:
		field_option = "Title"
	else:
		field_option = "Price"

	# Single filter testcases
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_Id_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_ClassName_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_AncestorClass_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_TagName_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_FontSize_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_FontColor_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_BgColor_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_FontStyle_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_FontWeight_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_Width_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_Height_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_XPath_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_LeftAlign_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_TopAlign_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_Prefix_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_Suffix_Amazon(page_bot, field_option)

	# Double filters testcases
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_FontSize_FontColor_Amazon(page_bot, field_option)
	# reset(page_bot, target_page, target_field)
	# testcases.test_filter_by_LeftAlign_FontSize_Amazon(page_bot, field_option)

	# Workflow test
	testcases.test_workflow_Amazon(page_bot, target_page)


	time.sleep(1000)

if __name__ == '__main__':
	main()

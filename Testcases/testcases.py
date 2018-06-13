#!/usr/bin/env python
# -*- coding:utf-8 -*-
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from subprocess import call
import sys
import time
import re

############################ Testcases for a single filter ############################

def test_filter_by_ClassName_Amazon(pb, option):
	# Enable Filter by ClassName
	pb.find_element_by_xpath("//input[@id='filter_class']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 28

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by ClassName Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by ClassName Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_class']").click()

def test_filter_by_AncestorClass_Amazon(pb, option):
	
	# Enable Filter by AncestorClass
	pb.find_element_by_xpath("//input[@id='filter_ancestor_class']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 28

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by AncestorClass Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by AncestorClass Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_ancestor_class']").click()

def test_filter_by_Id_Amazon(pb, option):
	# Enable Filter by Id
	pb.find_element_by_xpath("//input[@id='filter_id']").click()
	alert = pb.switch_to_alert()
	alert.accept()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 1

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by Id Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by Id Test ------------------------------ Failed" % option

	# Switch back to tooltip
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))

def test_filter_by_TagName_Amazon(pb, option):
	# Enable Filter by TagName
	pb.find_element_by_xpath("//input[@id='filter_tag']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 28

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by TagName Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by TagName Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_tag']").click()

def test_filter_by_FontSize_Amazon(pb, option):
	# Enable Filter by FontSize
	pb.find_element_by_xpath("//input[@id='filter_font-size']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 35

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by FontSize Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by FontSize Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_font-size']").click()

def test_filter_by_FontColor_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_color']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 1130

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by FontColor Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by FontColor Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_color']").click()

def test_filter_by_BgColor_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_background-color']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 6728

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by BgColor Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by BgColor Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_background-color']").click()

def test_filter_by_FontStyle_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_font-style']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 6598

	print len(actual_result)
	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by FontStyle Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by FontStyle Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_font-style']").click()
	
def test_filter_by_FontWeight_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_font-weight']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 6634

	print len(actual_result)
	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by FontWeight Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by FontWeight Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_font-weight']").click()

def test_filter_by_Width_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_width']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 4

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by Width Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by Width Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_width']").click()

def test_filter_by_Height_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_height']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 56

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by Height Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by Height Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_height']").click()	

def test_filter_by_XPath_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_xpath']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 0

	print len(actual_result)
	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by XPath Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by XPath Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_xpath']").click()

def test_filter_by_LeftAlign_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_left_align_with']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 649

	print len(actual_result)
	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by Left Align Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by Left Align Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_left_align_with']").click()

def test_filter_by_TopAlign_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_top_align_with']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 4

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by Top Align Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by Top Align Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_top_align_with']").click()

def test_filter_by_Prefix_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_prefix']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 4

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by Prefix Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by Prefix Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_prefix']").click()

def test_filter_by_Suffix_Amazon(pb, option):
	# Enable Filter by FontColor
	pb.find_element_by_xpath("//input[@id='filter_suffix']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 3

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by Suffix Test ------------------------------ Passed" % option
	else:
		print "Amazon %s Filter by Suffix Test ------------------------------ Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_suffix']").click()	

#######################################################################################






############################ Testcases for double filters #############################

def test_filter_by_FontSize_FontColor_Amazon(pb, option):
	# Enable Filter by FontSize
	pb.find_element_by_xpath("//input[@id='filter_font-size']").click()
	pb.find_element_by_xpath("//input[@id='filter_color']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 32

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by FontSize & FontColor Test ---------------- Passed" % option
	else:
		print "Amazon %s Filter by FontSize & FontColor Test ---------------- Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_font-size']").click()
	pb.find_element_by_xpath("//input[@id='filter_color']").click()

def test_filter_by_LeftAlign_FontSize_Amazon(pb, option):
	# Enable Filter by FontSize
	pb.find_element_by_xpath("//input[@id='filter_left_align_with']").click()
	pb.find_element_by_xpath("//input[@id='filter_font-size']").click()

	# Check filter result
	pb.switch_to_default_content()
	content = pb.page_source
	actual_result = re.findall("dotted 2px;", content, re.S)
	expected_result = 28

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon %s Filter by LeftAlign & FontSize Test ---------------- Passed" % option
	else:
		print "Amazon %s Filter by LeftAlign & FontSize Test ---------------- Failed" % option

	# Uncheck filter
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//input[@id='filter_left_align_with']").click()
	pb.find_element_by_xpath("//input[@id='filter_font-size']").click()


#######################################################################################






###################################  Workflow Test  ###################################

def test_workflow_Amazon(pb, page):
	# Setup Web-Data-View
	pb.get(page)
	call(["/Users/apple/Downloads/runsikulix", "-r", "/Users/apple/Downloads/Testcases/startExtension.sikuli"]) # Path of runsikulix and sikuli script
	try:
		wait = WebDriverWait(pb, 25).until(EC.presence_of_element_located((By.ID, "webdataview-floating-widget")))
	except Exception:
		print "Web-Data-View is not enabled."
		pb.quit()
		sys.exit()

	# Select title field
	pb.find_element_by_xpath("//h2[1]").click()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//i[@id='cap_toggle']").click()
	pb.find_element_by_xpath("//input[@id='filter_class']").click()
	pb.switch_to_default_content()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webdataview-widget-iframe']"))
	pb.find_element_by_xpath("//i[@id='select-apply']").click()
	pb.switch_to_default_content()

	# Select price field
	pb.find_element_by_xpath("//span[@class='sx-price sx-price-large']").click()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//i[@id='web-view-expand-selection']").click()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//i[@id='cap_toggle']").click()
	pb.find_element_by_xpath("//input[@id='filter_class']").click()
	pb.switch_to_default_content()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webdataview-widget-iframe']"))
	pb.find_element_by_xpath("//i[@id='select-apply']").click()
	pb.switch_to_default_content()

	# Select record field
	pb.find_element_by_xpath("//div[@class='a-fixed-left-grid-col a-col-left'][1]").click()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//i[@id='web-view-expand-selection']").click()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//i[@id='web-view-expand-selection']").click()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webview-tooltip']"))
	pb.find_element_by_xpath("//i[@id='cap_toggle']").click()
	pb.find_element_by_xpath("//input[@id='filter_class']").click()
	pb.switch_to_default_content()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webdataview-widget-iframe']"))
	pb.find_element_by_xpath("//div[@id='widget-labels']//li[3]").click()
	pb.switch_to_default_content()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@class='content-frame-default-iframe delete_label_class']"))
	pb.find_element_by_xpath("//button[@class='btn btn-success']").click()
	pb.switch_to_default_content()
	pb.switch_to_frame(pb.find_element_by_xpath("//iframe[@id='webdataview-widget-iframe']"))
	pb.find_element_by_xpath("//i[@id='select-apply']").click()
	pb.find_element_by_xpath("//i[@id='grid-view']").click()


	# Check table results
	time.sleep(1)
	pb.switch_to_window(pb.window_handles[1])
	content = pb.page_source
	actual_result = re.findall('tr role="row" class=', content, re.S)
	expected_result = 30

	# Print test result message
	if len(actual_result) == expected_result:
		print "Amazon Workflow Test -------------------------- Passed"
	else:
		print "Amazon Workflow Test -------------------------- Failed"








#######################################################################################

































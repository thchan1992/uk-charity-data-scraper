
from datetime import datetime
import json
from bs4 import BeautifulSoup
from lxml import etree
import requests
from operations import *


with open("charityUrlList.json", "r") as file:
    json_string = file.read()

# Parse the JSON string and convert it to a Python list
json_list = json.loads(json_string)
list = []
HEADERS = ({'User-Agent':
            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 \
            (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})
for i in range(len(json_list)):

    # print(json_list[i]["charityUrl"])
    if json_list[i]["charityUrl"] == None:
        continue

    webpage = requests.get(json_list[i]["charityUrl"], headers=HEADERS)
    soup = BeautifulSoup(webpage.content, "html.parser")
    dom = etree.HTML(str(soup))

    try:
        name = dom.xpath(
            '//*[@id="portlet_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet"]/div/div/div/div/div[1]/div/div/div[1]/div/h1/text()')[1].strip()
    except:
        name = None
    try:
        id = dom.xpath(
            '//*[@id="portlet_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet"]/div/div/div/div/div[1]/div/div/div[2]/div[1]/span')[0].text.strip()
    except:
        id = None

    try:
        description = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[1]/div/p')[0].text.strip()
    except:
        description = None

    try:
        status = dom.xpath(
            '//*[@id="portlet_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet"]/div/div/div/div/div[1]/div/div/div[2]/div[2]/div/div[2]')[0].text.strip()
    except:
        status = None

    try:
        incomeTotal = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[1]/h3/div')[0].text.strip()
    except:
        try:
            incomeTotal = split_str(dom.xpath(
                '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]')[0].text.strip())

        except:
            incomeTotal = None

    try:
        donationsAndLegacies = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[1]/table/tbody/tr[1]/td[3]')[0].text.strip()
    except:
        donationsAndLegacies = None

    try:
        incomeCharitableActivities = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[1]/table/tbody/tr[2]/td[3]')[0].text.strip()
    except:

        incomeCharitableActivities = None

    try:
        incomeOtherTradingActivities = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[1]/table/tbody/tr[3]/td[3]')[0].text.strip()
    except:
        incomeOtherTradingActivities = None

    try:
        incomeInvestments = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[1]/table/tbody/tr[4]/td[3]')[0].text.strip()
    except:
        incomeInvestments = None

    try:
        incomeOther = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[1]/table/tbody/tr[5]/td[3]')[0].text.strip()
    except:
        incomeOther = None

    try:
        expenditureTotal = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[2]/h3/div')[0].text.strip()

    except:
        try:
            expenditureTotal = split_str(dom.xpath(
                '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[4]')[0].text.strip())

        except:
            expenditureTotal = None

    try:
        expenditureRaisingFunds = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[2]/table/tbody/tr[1]/td[3]')[0].text.strip()
    except:
        expenditureRaisingFunds = None

    try:
        expenditureCharitableActivities = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[2]/table/tbody/tr[2]/td[3]')[0].text.strip()
    except:
        expenditureCharitableActivities = None

    try:
        expenditureOther = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[2]/table/tbody/tr[3]/td[3]')[0].text.strip()
    except:
        expenditureOther = None

    try:
        charitableExpenditureIncomeGenerationAndGovernance = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[3]/div[2]/table/tbody/tr[1]/td[3]')[0].text.strip()
    except:
        charitableExpenditureIncomeGenerationAndGovernance = None

    try:
        charitableExpenditureCharitableExpenditure = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_charitableExpenditure"]/table/tbody/tr[2]/td[3]')[0].text.strip()

    except:
        charitableExpenditureCharitableExpenditure = None

    try:
        charitableExpenditureRetainedForFutureUse = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_charitableExpenditure"]/table/tbody/tr[3]/td[3]')[0].text.strip()
    except:
        charitableExpenditureRetainedForFutureUse = None

    try:
        period = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[2]/div/p')[0]
    except:
        period = None

    # try:
    #     breakdown = dom.xpath(
    #         '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[2]/div/p')[1]
    #     print("bb:" + breakdown)
    # except:
    #     print("breadown cant be found")
    #     breakdown = None

    try:
        investmentGains = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[4]/div/p[1]')[0].text.strip()
    except:
        investmentGains = None

    try:
        peopleEmployees = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[7]/div/div/div[2]/p[1]/strong')[0].text.strip()
    except:
        peopleEmployees = None

    try:
        peopleTrustees = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[7]/div/div/div[2]/p[2]/strong')[0].text.strip()
    except:
        try:
            peopleTrustees = dom.xpath(
                '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[6]/div/div/div[2]/p/strong')[0].text.strip()
        except:
            peopleTrustees = None

    try:
        peopleVolunteers = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[7]/div/div/div[2]/p[3]/strong')[0].text.strip()
    except:
        peopleVolunteers = None

    try:
        fundraisingNote = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[8]/div[1]/div')[0].text.strip()
    except:
        fundraisingNote = None

    try:
        tradingNote = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[8]/div[2]/div')[0].text.strip()
    except:
        tradingNote = None

    try:
        trusteePaymentsNote = dom.xpath(
            '//*[@id="_uk_gov_ccew_onereg_charitydetails_web_portlet_CharityDetailsPortlet_mainContent"]/div[8]/div[3]/div')[0].text.strip()
    except:
        trusteePaymentsNote = None

    current_date = datetime.now()

    # get the website of the charity
    webpage2 = requests.get(
        json_list[i]["charityUrl"] + "/contact-information", headers=HEADERS)
    soup2 = BeautifulSoup(webpage2.content, "html.parser")
    dom2 = etree.HTML(str(soup2))

    try:
        website = dom2.xpath(
            '//*[@id="charity-contact-website-link"]')[0].text.strip()
    except:
        website = None

    obj = {"name": {"value": name}, "id": {"preprocessed": id, "value": numExtractor(
        id)}, "description": {"value": description}, "status": status, "incomeTotal": {"preprocessed": incomeTotal, "value": fromAbbreviated(incomeTotal)}, "incomeDonationsAndLegacies": {"preprocessed": donationsAndLegacies, "value": fromAbbreviated(donationsAndLegacies)}, "incomeCharitableActivities": {"preprocessed": incomeCharitableActivities, "value": fromAbbreviated(incomeCharitableActivities)}, "incomeOtherTradingActivities": {"preprocessed": incomeOtherTradingActivities, "value": fromAbbreviated(incomeOtherTradingActivities)}, "incomeInvestments": {"preprocessed": incomeInvestments, "value": fromAbbreviated(incomeInvestments)}, "incomeOther": {"preprocessed": incomeOther, "value": fromAbbreviated(incomeOther)}, "expenditureTotal": {"preprocessed": expenditureTotal, "value": fromAbbreviated(expenditureTotal)}, "expenditureRaisingFunds": {"preprocessed": expenditureRaisingFunds, "value": fromAbbreviated(expenditureRaisingFunds)}, "expenditureCharitableActivities": {"preprocessed": expenditureCharitableActivities, "value": fromAbbreviated(expenditureCharitableActivities)}, "expenditureOther": {"preprocessed": expenditureOther, "value": fromAbbreviated(expenditureOther)}, "charitableExpenditureIncomeGenerationAndGovernance": {"preprocessed": charitableExpenditureIncomeGenerationAndGovernance, "value": fromAbbreviated(charitableExpenditureIncomeGenerationAndGovernance)}, "charitableExpenditureCharitableExpenditure": {"preprocessed": charitableExpenditureCharitableExpenditure, "value": fromAbbreviated(charitableExpenditureCharitableExpenditure)}, "charitableExpenditureRetainedForFutureUse": {"preprocessed": charitableExpenditureRetainedForFutureUse, "value": fromAbbreviated(charitableExpenditureRetainedForFutureUse)}, "investmentGains": {"value": investmentGains}, "peopleEmployees": {"preprocessed": peopleEmployees, "value": numExtractor(peopleEmployees)}, "peopleTrustees": {"preprocessed": peopleTrustees, "value": numExtractor(peopleTrustees)}, "peopleVolunteers": {"preprocessed": peopleVolunteers, "value": numExtractor(peopleVolunteers)}, "fundraisingNote": {"value": fundraisingNote}, "tradingNote": {"value": tradingNote}, "trusteePaymentsNote": {"value": trusteePaymentsNote}, "website": {"value": website}, "updated": {"value": current_date.isoformat()}
    }

    list.append(obj)
    print(f"{((i / len(json_list)) * 100):.0f}%")

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(list, f, ensure_ascii=False, indent=4)

print("extraction completed")

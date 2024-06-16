import requests
from bs4 import BeautifulSoup


def get_year_inflation():
    response = requests.request("get", "https://www.statbureau.org/ru/russia/inflation")
    soup = BeautifulSoup(response.content, "html.parser")
    return float(soup.find("table", "currnet-inflation-table").find_all("td", class_="rightAlign")[5].text[:-1].replace(",", "."))


def get_price_by_meter():
    response = requests.request("get", "https://rosrealt.ru/moskva/cena/?t=dinamika")
    soup = BeautifulSoup(response.content, "html.parser")
    answ = soup.find_all("div", class_="table-responsive publication__section")[-1].find_all("tr")[-1].find_all("td")[1:]
    answ = [int(x.text.replace(" ", "")) for x in answ]
    answ = {k: v for k, v in zip(["Офисы", "Торговые площади", "Гаражи", "Аренда тороговых помещений", "Аренда офисов"], answ)}
    return answ
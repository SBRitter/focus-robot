# coding=utf-8
import random
import sys
import codecs

# give file name for output file as argument

experimentFocus = [
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective",
  "background", "broad", "narrow", "corrective"
];
experimentObjects = [
  "neene", "neene", "neene", "neene",
  "naane", "naane", "naane", "naane",
  "maane", "maane", "maane", "maane",
  "loone", "loone", "loone", "loone",
  "laane", "laane", "laane", "laane",
  "waane", "waane", "waane", "waane",
  "noome", "noome", "noome", "noome",
  "meeme", "meeme", "meeme", "meeme",
  "moome", "moome", "moome", "moome",
  "seeme", "seeme", "seeme", "seeme",
  "soome", "soome", "soome", "soome",
  "woome", "woome", "woome", "woome",
  "neese", "neese", "neese", "neese",
  "meese", "meese", "meese", "meese",
  "maase", "maase", "maase", "maase",
  "seese", "seese", "seese", "seese",
  "saase", "saase", "saase", "saase",
  "woose", "woose", "woose", "woose",
  "noole", "noole", "noole", "noole",
  "naale", "naale", "naale", "naale",
  "leele", "leele", "leele", "leele",
  "loole", "loole", "loole", "loole",
  "laale", "laale", "laale", "laale",
  "weele", "weele", "weele", "weele",
  "moowe", "moowe", "moowe", "moowe",
  "soowe", "soowe", "soowe", "soowe",
  "saawe", "saawe", "saawe", "saawe",
  "leewe", "leewe", "leewe", "leewe",
  "weewe", "weewe", "weewe", "weewe",
  "waawe", "waawe", "waawe", "waawe"
];
experimentTools = [
  "amboss", "amboss", "amboss", "amboss",
  "besen", "besen", "besen", "besen",
  "bohrer", "bohrer", "bohrer", "bohrer",
  "bürste", "bürste", "bürste", "bürste",
  "feile", "feile", "feile", "feile",
  "hammer", "hammer", "hammer", "hammer",
  "nagel", "nagel", "nagel", "nagel",
  "pinsel", "pinsel", "pinsel", "pinsel",
  "rolle", "rolle", "rolle", "rolle",
  "säge", "säge", "säge", "säge",
  "schaufel", "schaufel", "schaufel", "schaufel",
  "schere", "schere", "schere", "schere",
  "schraube", "schraube", "schraube", "schraube",
  "zange", "zange", "zange", "zange",
  "zirkel", "zirkel", "zirkel", "zirkel",
  "amboss", "amboss", "amboss", "amboss",
  "besen", "besen", "besen", "besen",
  "bohrer", "bohrer", "bohrer", "bohrer",
  "bürste", "bürste", "bürste", "bürste",
  "feile", "feile", "feile", "feile",
  "hammer", "hammer", "hammer", "hammer",
  "nagel", "nagel", "nagel", "nagel",
  "pinsel", "pinsel", "pinsel", "pinsel",
  "rolle", "rolle", "rolle", "rolle",
  "säge", "säge", "säge", "säge",
  "schaufel", "schaufel", "schaufel", "schaufel",
  "schere", "schere", "schere", "schere",
  "schraube", "schraube", "schraube", "schraube",
  "zange", "zange", "zange", "zange",
  "zirkel", "zirkel", "zirkel", "zirkel"
];
experimentCompetitors = [
  "zange", "na", "na", "woose",
  "amboss", "na", "na", "seeme",
  "schaufel", "na", "na", "soowe",
  "schere", "na", "na", "waawe",
  "bürste", "na", "na", "seese",
  "feile", "na", "na", "noole",
  "hammer", "na", "na", "weele",
  "nagel", "na", "na", "saase",
  "pinsel", "na", "na", "saawe",
  "rolle", "na", "na", "naane",
  "säge", "na", "na", "leele",
  "besen", "na", "na", "leewe",
  "bohrer", "na", "na", "loole",
  "schraube", "na", "na", "naale",
  "besen", "na", "na", "weewe",
  "zirkel", "na", "na", "laane",
  "zirkel", "na", "na", "meeme",
  "amboss", "na", "na", "neene",
  "zange", "na", "na", "waane",
  "bohrer", "na", "na", "meese",
  "bürste", "na", "na", "soome",
  "feile", "na", "na", "neese",
  "hammer", "na", "na", "moowe",
  "schaufel", "na", "na", "noome",
  "pinsel", "na", "na", "laale",
  "rolle", "na", "na", "maane",
  "säge", "na", "na", "moome",
  "nagel", "na", "na", "woome",
  "schere", "na", "na", "maase",
  "schraube", "na", "na", "loone"
];

class Quadruple:
  object = ""
  tool = ""
  focus = ""
  competitor = ""

final_list = []
times_randomised = 0

for a in range(0, len(experimentObjects)):
  new_quadruple = Quadruple()
  new_quadruple.object = experimentObjects[a]
  new_quadruple.tool = experimentTools[a]
  new_quadruple.focus = experimentFocus[a]
  new_quadruple.competitor = experimentCompetitors[a]
  final_list.append(new_quadruple)

def randomise(a_list):
  counter = len(a_list) - 1
  while (counter > -1):
    random_number = random.randint(0, len(a_list) - 1)
    temp = a_list[counter]
    a_list[counter] = a_list[random_number];
    a_list[random_number] = temp;
    counter -= 1

  return a_list

def check_randomisation(a_list):
  number_of_double_focus = 0;
  for i in range(0, len(a_list) - 1):
    if (a_list[i].object == a_list[i+1].object or a_list[i].tool == a_list[i+1].tool):
      return "bad"
    if (i < len(a_list) - 2 and (a_list[i].focus == a_list[i+1].focus and a_list[i].focus == a_list[i+2].focus)):
      return "bad"
    if (a_list[i].focus == a_list[i+1].focus):
      number_of_double_focus += 1
    if (i == len(a_list) - 2):
      if (number_of_double_focus > 18): # 18 is max. 15 % of the cases
        print "found " + str(number_of_double_focus) + " pairs of focus. compiling new list."
        return "bad"
      else:
        return "good"

final_list = randomise(final_list)
times_randomised += 1
list_random_order = "bad"
while (list_random_order == "bad"):
  list_random_order = check_randomisation(final_list)
  if (list_random_order == "bad"):
    final_list = randomise(final_list)
    times_randomised += 1
    
for item in final_list:
  print item.object + "," + item.tool + "," + item.competitor + "," + item.focus

file = codecs.open(sys.argv[1], 'w')
for item in final_list:
  file.write(item.object + "," + item.tool + "," + item.competitor + "," + item.focus)
  if (final_list.index(item) < len(final_list)-1):
    file.write("\n")

file.close()

print "Randomised: " + str(times_randomised) + " times."
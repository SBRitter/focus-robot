# coding=utf-8
import random
import sys
import codecs

# give file name for output file as argument

# input data
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
  "background", "broad", "narrow", "corrective"
];
experimentObjects = [
  "wohse", "wohse", "wohse", "wohse",
  "mahse", "mahse", "mahse", "mahse",
  "bohwe", "bohwe", "bohwe", "bohwe",
  "mohwe", "mohwe", "mohwe", "mohwe",
  "wahwe", "wahwe", "wahwe", "wahwe",
  "nohse", "nohse", "nohse", "nohse",
  "mohme", "mohme", "mohme", "mohme",
  "bohme", "bohme", "bohme", "bohme",
  "nahle", "nahle", "nahle", "nahle",
  "bahle", "bahle", "bahle", "bahle",
  "lohne", "lohne", "lohne", "lohne",
  "lohle", "lohle", "lohle", "lohle",
  "lahse", "lahse", "lahse", "lahse",
  "mahne", "mahne", "mahne", "mahne",
  "nohme", "nohme", "nohme", "nohme",
  "wahne", "wahne", "wahne", "wahne",
  "wohme", "wohme", "wohme", "wohme",
  "nahne", "nahne", "nahne", "nahne",
  "lahle", "lahle", "lahle", "lahle",
  "bahwe", "bahwe", "bahwe", "bahwe"
];
experimentTools = [
  "amboss", "amboss", "amboss", "amboss",
  "besen", "besen", "besen", "besen",
  "bohrer", "bohrer", "bohrer", "bohrer",
  "bürste", "bürste", "bürste", "bürste",
  "hammer", "hammer", "hammer", "hammer",
  "pinsel", "pinsel", "pinsel", "pinsel",
  "rolle", "rolle", "rolle", "rolle",
  "säge", "säge", "säge", "säge",
  "schere", "schere", "schere", "schere",
  "zange", "zange", "zange", "zange",
  "amboss", "amboss","amboss","amboss",
  "besen", "besen", "besen", "besen",
  "bohrer", "bohrer", "bohrer", "bohrer",
  "bürste", "bürste", "bürste", "bürste",
  "hammer", "hammer", "hammer", "hammer",
  "pinsel", "pinsel", "pinsel", "pinsel",
  "rolle", "rolle", "rolle", "rolle",
  "säge", "säge", "säge", "säge",
  "schere", "schere", "schere", "schere",
  "zange", "zange", "zange", "zange",
];
experimentCompetitors = [
  "zange", "na", "na", "nahle",
  "schere", "na", "na", "bohwe",
  "säge", "na", "na", "mahse",
  "rolle", "na", "na", "bahle",
  "pinsel", "na", "na", "nohse",
  "amboss", "na", "na", "wahwe",
  "besen", "na", "na", "lahse",
  "bohrer", "na", "na", "mahne",
  "bürste", "na", "na", "wohse",
  "hammer", "na", "na", "mohwe",
  "pinsel", "na", "na", "bahwe",
  "rolle", "na", "na", "wahne",
  "schere", "na", "na", "mohme",
  "säge", "na", "na", "bohme",
  "zange", "na", "na", "lahle",
  "bohrer", "na", "na", "lohle",
  "bürste", "na", "na", "nahne",
  "hammer", "na", "na", "wohme",
  "besen", "na", "na", "nohme",
  "amboss", "na", "na", "lohne"
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
      if (number_of_double_focus > 12): # max. 15 % of the cases
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

file = codecs.open(sys.argv[1], 'wb')
for item in final_list:
  file.write(item.object + "," + item.tool + "," + item.competitor + "," + item.focus)
  if (final_list.index(item) < len(final_list)-1):
    file.write("\n")

file.close()

print "Randomised: " + str(times_randomised) + " times."
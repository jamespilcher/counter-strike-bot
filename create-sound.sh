#!/bin/bash

cs_kill_folder="./cs-kill"
cs_attack_gun_folder="${cs_kill_folder}/cs-attack-gun"
cs_death_folder="${cs_kill_folder}/cs-death"
cs_attack_other_folder="${cs_kill_folder}/cs-attack-other"
cs_dink_folder="${cs_kill_folder}/cs-dink"
cs_help_folder="${cs_kill_folder}/cs-help"

help_file="${cs_help_folder}/help01.mp3"
gun_attack_file="${cs_attack_gun_folder}/usp1.mp3"
other_attack_file="${cs_attack_other_folder}/knife_stab.mp3"
dink_file="${cs_dink_folder}/bhit_helment-1.mp3"
death_file="${cs_death_folder}/death1.mp3"

output_file='./mixed_sound.mp3'

# Mix the audio files into one
# ffmpeg -i "${help_file}" -i "${gun_attack_file}" -i "${dink_file}" -i "${death_file}" -filter_complex "[1:a]adelay=200|200[delayed_gun_attack]; [3:a]adelay=200|200[delayed_death]; [0:a][delayed_gun_attack][2:a][delayed_death]concat=n=4:v=0:a=1[outa]" -map "[outa]" "${output_file}"
ffmpeg -i "${help_file}" -i "${other_attack_file}" -i "${death_file}" -filter_complex "[1:a]adelay=200|200[delayed_gun_attack]; [2:a]adelay=200|200[delayed_death]; [0:a][delayed_gun_attack][delayed_death]concat=n=3:v=0:a=1[outa]" -map "[outa]" "${output_file}"

if [ $? -eq 0 ]
then
  echo "Successfully mixed the audio files."
else
  echo "An error occurred while mixing the audio files."
fi
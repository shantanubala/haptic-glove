/*****************************************************************************
 * File: HapticGlove.c
 * Description: Currently sets up the pins for output to the motors
 ****************************************************************************/


#include "SerialCom.h"

//this header file defines the _BV function we use later on
//	to get the bit value associated
//	with the port for IO
#include <avr/sfr_defs.h>

//we use this for durations, as the headerfile implies
#include <util/delay.h>

//this header file imports the corresponding IO header file
//	for the atmega 168
#include <avr/io.h>


/**
 * Sets up the microcontroller's data directions.
 * This function only needs to be called once, but must be called before motors are enabled.
 */
void data_direction_setup() {
	//this sets the data direction

	//DDRx for `Data Direction Register` 
	//	where `x` is the port
	
	//we pass the port in the
	//	format - DDxy where `x` is the set of ports
	//	it belongs to, and `y` is the port number

	//note that 1 means the pin  is output, and 0 means it's input
	
	//the `or` prevents us from previous assignment
	
	DDRB |= _BV(DDB0) | _BV(DDB1) | _BV(DDB6) | _BV(DDB7);
	DDRC |= _BV(DDC0) | _BV(DDC1) | _BV(DDC2) | _BV(DDC3) | _BV(DDC5); // Pin 5 of port C is used for debug LED
	DDRD |= _BV(DDD2) | _BV(DDD3) | _BV(DDD4) | _BV(DDD5) | _BV(DDD6) | _BV(DDD7);
}


/**
 * Activates a particular motor.
 * It simply activates one of the microcontroller's pins that is not used for programming or reserved.
 * @param port A uint8_t value corresponding to one of the Atmega168's ports
 * @param portset A pointer to a uint8_t value that corresponds to one of the Atmega168's port sets
 * @param turnOn A 0 or 1, depending on whether you wish to turn off or turn on a particular motor
 */
void motor_switch (uint8_t port, uint8_t* portset, uint8_t turnOn ) {
	if (turnOn) {
		//we want motors to run simultaneously
		*portset |= _BV(port);
	}
	else {
		//the tilda (~) inverts the BV value, so we use
		// AND-EQUAL to avoid turning on more motors
		*portset &= ~_BV(port);
	}
	
}

/*
//nothing specific here, just call
//we add it as a function so we can call it
//to prompt the user after every input
void menu_display () {
	static const char menu[74] = "\r\nChoose Motor [A-N: On; a-n: Off]; 'x' to change time; 'r' to read time: ";
	
	//write each individual character in the menu array to serial
	for (int i = 0; i < 74; i++) {
		serialWrite(menu[i]);
	}
	
}*/



/**
 * Turns off all running motors.
 */
void kill_all_motors() {
	//kill all port B
	PORTB &= ~_BV(PORTB0);
	PORTB &= ~_BV(PORTB1);
	PORTB &= ~_BV(PORTB6);
	PORTB &= ~_BV(PORTB7);
	
	//kill all port C
	PORTC &= ~_BV(PORTC0);
	PORTC &= ~_BV(PORTC1);
	PORTC &= ~_BV(PORTC2);
	PORTC &= ~_BV(PORTC3);
	
	//kill all port D
	PORTD &= ~_BV(PORTD2);
	PORTD &= ~_BV(PORTD3);
	PORTD &= ~_BV(PORTD4);
	PORTD &= ~_BV(PORTD5);
	PORTD &= ~_BV(PORTD6);
	PORTD &= ~_BV(PORTD7);
}

const char TimingOn[47] = "\r\nEnter On-Time [1 to 30] (ms) - Ex: 10 or 02: ";
const char TimingOff[48] = "\r\nEnter Off-Time [1 to 30] (ms) - Ex: 10 or 02: ";
const char TimingDuration[53] = "\r\nEnter Duration [1 - 5000] (ms) - Ex: 0001 or 4000: ";
const char TimingDelay[50] = "\r\nEnter Delay [1 - 5000] (ms) - Ex: 0020 or 2000: ";
int get_on_time() {
	// Read the on time
	// Three numbers have to be entered for the on time and off time.
	// Starts with the hundred digit, tenth and then the unit digit.

	for (int i=0; i<47; i++)
		serialWrite (TimingOn[i]);
	char Read1 = serialRead();
	serialWrite (Read1);
	char Read0 = serialRead();
	serialWrite (Read0);

	// Convert from ASCII character to number	
	return ((Read1 - 48) * 10 + (Read0 - 48)) * 8;
}

int get_off_time() {
	// Read the off time
	for (int i=0; i<48; i++)
		serialWrite (TimingOff[i]);
	char Ready = serialRead();
	serialWrite (Ready);
	char Readz = serialRead();
	serialWrite (Readz);
	
	// Convert from ASCII character to number	
	return ((Ready - 48) * 10 + (Readz - 48)) * 8;
}

int get_delay() {
	for (int i = 0; i < 50; i++) {
		serialWrite(TimingDelay[i]);
	}

	char Read1, Read2, Read3, Read4;
	Read1 = serialRead();
	serialWrite(Read1);
	Read2 = serialRead();
	serialWrite(Read2);
	Read3 = serialRead();
	serialWrite(Read3);
	Read4 = serialRead();
	serialWrite(Read4);

	return (Read1 - 48) * 1000 + (Read2 - 48) * 100 + (Read3 - 48) * 10 + (Read4 - 48);
}

int get_duration() {
	for (int i = 0; i < 53; i++) {
		serialWrite(TimingDuration[i]);
	}

	char Read1, Read2, Read3, Read4;
	Read1 = serialRead();
	serialWrite(Read1);
	Read2 = serialRead();
	serialWrite(Read2);
	Read3 = serialRead();
	serialWrite(Read3);
	Read4 = serialRead();
	serialWrite(Read4);

	return (Read1 - 48) * 1000 + (Read2 - 48) * 100 + (Read3 - 48) * 10 + (Read4 - 48);
}

const char EnterMotor[43] = "\r\nEnter a single motor (A-N) for vibration ";

motor all_motors[15];

void define_all_motors() {
	all_motors[0].port = PORTB0;
	all_motors[0].portset = &PORTB;
	all_motors[0].id = 'a';
					
	all_motors[1].port = PORTD7;
	all_motors[1].portset = &PORTD;
	all_motors[1].id = 'b';
	
	all_motors[2].port = PORTD6;
	all_motors[2].portset = &PORTD;
	all_motors[2].id = 'c';
	
	all_motors[3].port = PORTD5;
	all_motors[3].portset = &PORTD;
	all_motors[3].id = 'd';
	
	all_motors[4].port = PORTB7;
	all_motors[4].portset = &PORTB;
	all_motors[4].id = 'e';

	all_motors[5].port = PORTB6;
	all_motors[5].portset = &PORTB;
	all_motors[5].id = 'f';

	all_motors[6].port = PORTD4;
	all_motors[6].portset = &PORTD;
	all_motors[6].id = 'g';

	all_motors[7].port = PORTD3;
	all_motors[7].portset = &PORTD;
	all_motors[7].id = 'h';

	all_motors[8].port = PORTD2;
	all_motors[8].portset = &PORTD;
	all_motors[8].id = 'i';

	all_motors[9].port = PORTB1;
	all_motors[9].portset = &PORTB;
	all_motors[9].id = 'j';

	all_motors[10].port = PORTC0;
	all_motors[10].portset = &PORTC;
	all_motors[10].id = 'k';

	all_motors[11].port = PORTC1;
	all_motors[11].portset = &PORTC;
	all_motors[11].id = 'l';

	all_motors[12].port = PORTC2;
	all_motors[12].portset = &PORTC;
	all_motors[12].id = 'm';
	
	all_motors[13].port = PORTC3;
	all_motors[13].portset = &PORTC;
	all_motors[13].id = 'n';

	all_motors[14].port = 0;
	all_motors[14].portset = &PORTD;
	all_motors[14].id = 'x';
}

vibration get_vibration(int num) {
	motor mot;
	char mot_id;
	int index;
	int i;
	for (i = 0; i < 43; i++) {
		serialWrite(EnterMotor[i]);
	}
	serialWrite((num + 48));
	serialWrite(':');
	serialWrite(' ');

	mot_id = serialRead();
	vibration vib;
	index = (mot_id - 65);
	if (index >= 0 && index < 14) {
		serialWrite(mot_id);
		mot = all_motors[index];
		vib.on_time = get_on_time();
		vib.off_time = get_off_time();
		vib.delay = get_delay();
		vib.duration = get_duration();
		vib.off_time_zero = vib.delay + vib.duration;
		vib.motor = mot;
	}
	else {
		vib.on_time = 0;
		vib.duration = 0;
		vib.off_time = 0;
		vib.off_time_zero = 0;
		vib.motor = all_motors[14];
	}
	return vib;
}

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




//NOTE: you only need to call this function once 
//TODO: add inputs
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



//PARAM-1: the sepcific port to switch on or off
//	in the format PORTxy where x is the port set and y is port number
//PARAM-2: the pointer to the set of ports PARAM-1 belongs to
//	in the format PORTx where x is the port set
//PARAM-3: a boolean (0 or 1) value with 0=off and 1=on
/* EXAMPLE: */
/*
 * //this would turn on the motor located on port C2
 * motor_switch(PORTC0, &PORTC, 1);
 *
 */
//NOTE: see 
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

//nothing specific here, just call
//we add it as a function so we can call it
//to prompt the user after every input
void menu_display () {
	static const char menu[74] = "\r\nChoose Motor [A-N: On; a-n: Off]; 'x' to change time; 'r' to read time: ";
	
	//write each individual character in the menu array to serial
	for (int i = 0; i < 74; i++) {
		serialWrite(menu[i]);
	}
	
}

//as the name implies
//if something goes horribly wrong
//try and input the command for this function ASAP
//TODO: shorten this code
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

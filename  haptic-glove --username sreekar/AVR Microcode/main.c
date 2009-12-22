//this header file imports the corresponding IO header file
//	for the atmega 168
#include <avr/io.h>
#include <avr/interrupt.h>

#include "SerialCom.h"

//we use this for durations, as the headerfile implies
#include <util/delay.h>

//NOTE: serialRead, setup_serial, and serialWrite functions are in SerialCom.c
//NOTE: data_direction_setup and motor_switch functions are in HapticGlove.c

int On_Time = (8*5);
int Off_Time = (8*5);

//Number of motors running
// Keep track and make sure only 5 motors will run at anytime
int Num = 0;

// Motor running status (MRS)registers
MRS_Lower = 0; // Bits 0 - 6 represents the motors A, B, C, D, E, F, G; Bit 7 is unused
MRS_Upper = 0; // Bits 0 - 6 represents the motors H, I, J, K, L, M, N; Bit 7 is unused


//hold the value of serialRead
char selection[5];

selectionIndex = 0;

ISR(TIMER1_COMPA_vect)
{
	
}


ISR(TIMER0_COMPA_vect)
{
	if ((PINC >> 5) & 0x01)
	{
 		// Turn off the debug LED
		motor_switch (PORTC5, &PORTC, 0);
		kill_all_motors();    
		OCR0A = Off_Time;
	}
	else
	{
	 	// Turn on the debug LED
		motor_switch (PORTC5, &PORTC, 1);    

		// Count the number of motors that are on. If more than 5 are on, kill all motors
		int MotorCount = 0;
		int i,j;
		for (i=0; i<6; i++)
			MotorCount += ((MRS_Lower >> i) & 0x01);
		for (i=0; i<6; i++)
			MotorCount += ((MRS_Upper >> i) & 0x01);
		
		if (MotorCount > 5)
		{
			kill_all_motors();
			MRS_Lower = 0;
			MRS_Upper = 0;
		}
		else
		{
			motor_switch(PORTB0, &PORTB, ((MRS_Lower & 0x01) == 0x01) );					
			motor_switch(PORTD7, &PORTD, ((MRS_Lower & 0x02) == 0x02) );
			motor_switch(PORTD6, &PORTD, ((MRS_Lower & 0x04) == 0x04) );
			motor_switch(PORTD5, &PORTD, ((MRS_Lower & 0x08) == 0x08) );
			motor_switch(PORTB7, &PORTB, ((MRS_Lower & 0x10) == 0x10) );
			motor_switch(PORTB6, &PORTB, ((MRS_Lower & 0x20) == 0x20) );
			motor_switch(PORTD4, &PORTD, ((MRS_Lower & 0x40) == 0x40) );
			motor_switch(PORTD3, &PORTD, ((MRS_Upper & 0x01) == 0x01) );
			motor_switch(PORTD2, &PORTD, ((MRS_Upper & 0x02) == 0x02) );
			motor_switch(PORTB1, &PORTB, ((MRS_Upper & 0x04) == 0x04) );
			motor_switch(PORTC0, &PORTC, ((MRS_Upper & 0x08) == 0x08) );
			motor_switch(PORTC1, &PORTC, ((MRS_Upper & 0x10) == 0x10) );
			motor_switch(PORTC2, &PORTC, ((MRS_Upper & 0x20) == 0x20) );
			motor_switch(PORTC3, &PORTC, ((MRS_Upper & 0x40) == 0x40) );
		}
		
		OCR0A = On_Time;
	}
	
}

int main () {
	//Turn on global interrupts
	sei();

	//specify all port directions
	data_direction_setup();
	
	//sets up baud rates, Rx, Tx, etc.
	setup_serial();
	
	//welcomes and prompts user
	menu_display();
	

	
	//----------------------------------------------------
	//8-bit Timer/Counter0 with PWM  pg 88
	//  Set up timer 0 to generate interrupts @ 200Hz
	//----------------------------------------------------
	/*
	bottom 3 bits
	CS02 CS01 CS00 Description 
	0 0 0 No clock source (Timer/Counter stopped) 
	0 0 1 clkI/O/(No prescaling) 
	0 1 0 clk I/O/8 (From prescaler) 
	0 1 1 clkI/O/64 (From prescaler) 
	1 0 0 clk I/O/256 (From prescaler) 
	1 0 1 clk I/O/1024 (From prescaler) 
	1 1 0 External clock source on T0 pin. Clock on falling edge. 
	1 1 1 External clock source on T0 pin. Clock on rising edge. 
	*/

	//pick whichever prescaler you want based on your
	//were clocking internally at 8M I think?
	//1024 prescaler means 1024 clocks for each count
	//256 counts means 1 overflow
	//8M/1024/40= 195.3125  1/195 =  0.00512  1 overflow every 5.1 ms
 	TCCR0A = _BV(WGM01);
 	TCCR0B = _BV(CS00) | _BV(CS02);
 	OCR0A = 250; 
	TIMSK0 = _BV(OCIE0A);
	
	//16-bit timer(1)
	TCCR1A = _BV(WGM11);
	TCCR1B = _BV(CS10) | _BV(CS12);
	OCR1A = 250;
	TIMSK1 = _BV(OCIE1A);

	for (int i = 0; i < 5; i ++) 
	{
		selection[i] = '-';
	}
	
	//keep prompting the user once operations are finished
	//	using this infinite while loop
	while (1) {
		
		// Read the data from serial port	
		char Read = serialRead();
		
	}

}



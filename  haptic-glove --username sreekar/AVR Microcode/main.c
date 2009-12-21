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

	for (int i = 0; i < 5; i ++) 
	{
		selection[i] = '-';
	}
	
	//keep prompting the user once operations are finished
	//	using this infinite while loop
	while (1) {
		
		// Read the data from serial port	
		char Read = serialRead();

		// If 'x' then change the duty cycle
		if (Read == 'x')
		{
			const char TimingOn[47] = "\r\nEnter On-Time [1 to 30] (ms) - Ex: 10 or 02: ";
			const char TimingOff[48] = "\r\nEnter Off-Time [1 to 30] (ms) - Ex: 10 or 02: ";

			int i;

			// Read the on time
			// Three numbers have to be entered for the on time and off time.
			// Starts with the hundred digit, tenth and then the unit digit.

			for (i=0; i<47; i++)
				serialWrite (TimingOn[i]);
			char Read1 = serialRead();
			serialWrite (Read1);
			char Read0 = serialRead();
			serialWrite (Read0);
			
			
			// Read the off time
			for (i=0; i<48; i++)
				serialWrite (TimingOff[i]);
			char Ready = serialRead();
			serialWrite (Ready);
			char Readz = serialRead();
			serialWrite (Readz);

			// Convert from ASCII character to number	
			On_Time =  ((Read1 - 48) * 10 + (Read0 - 48)) * 8;
			Off_Time = ((Ready - 48) * 10 + (Readz - 48)) * 8;	
		}
		else if (Read == 'r')				
		{
			const char ONTIME[16] = "\r\nOn Time (ms): ";
			int kk;
			for (kk=0; kk<16; kk++)
				serialWrite(ONTIME[kk]);

			// Show the On time
			int TempOn = On_Time/8;

			int temp10 = (TempOn / 10) + 48;
			serialWrite(temp10);
			int temp1 = TempOn - ((TempOn/10) * 10) + 48;
			serialWrite(temp1);
							
					
			// Show the off time
			const char OFFTIME[17] = "\r\nOff Time (ms): ";
			for (kk=0; kk<17; kk++)
				serialWrite(OFFTIME[kk]);

			int Temp_Off = Off_Time /8;
			temp10 = (Temp_Off / 10) + 48;
			serialWrite(temp10);
			temp1 = Temp_Off - ((Temp_Off/10) * 10) + 48;
			serialWrite(temp1);
			

		}
		else
		{
			//NOTE: MRS: Motor Running Status
			//A-N corresponds to glove from upper-thumb to lower-pinky
			serialWrite(Read);
			switch (Read) {
				case 'A':
					MRS_Lower |= 0x01; // Set bit 0
					break;
				case 'B':
					MRS_Lower |= 0x02; // Set bit 1
					break;
				case 'C':
					MRS_Lower |= 0x04; // Set bit 2
					break;
				case 'D':
					MRS_Lower |= 0x08; // Set bit 3
					break;
				case 'E':
					MRS_Lower |= 0x10; // Set bit 4
					break;
				case 'F':
					MRS_Lower |= 0x20; // Set bit 5
					break;
				case 'G':
					MRS_Lower |= 0x40; // Set bit 6
					break;
				case 'H':
					MRS_Upper |= 0x01; // Set bit 0
					break;
				case 'I':
					MRS_Upper |= 0x02; // Set bit 1
					break;
				case 'J':
					MRS_Upper |= 0x04; // Set bit 2
					break;
				case 'K':
					MRS_Upper |= 0x08; // Set bit 3
					break;
				case 'L':
					MRS_Upper |= 0x10; // Set bit 4
					break;
				case 'M':
					MRS_Upper |= 0x20; // Set bit 5
					break;
				case 'N':
					MRS_Upper |= 0x40; // Set bit 6
					break;
				case 'a':
					MRS_Lower &= 0xFE; // Reset bit 0
					break;
				case 'b':
					MRS_Lower &= 0xFD; // Reset bit 1
					break;
				case 'c':
					MRS_Lower &= 0xFB; // Reset bit 2
					break;
				case 'd':
					MRS_Lower &= 0xF7; // Reset bit 3
					break;
				case 'e':
					MRS_Lower &= 0xEF; // Reset bit 4
					break;
				case 'f':
					MRS_Lower &= 0xDF; // Reset bit 5
					break;
				case 'g':
					MRS_Lower &= 0xBF; // Reset bit 6
					break;
				case 'h':
					MRS_Upper &= 0xFE; // Reset bit 0
					break;
				case 'i':
					MRS_Upper &= 0xFD; // Reset bit 1
					break;
				case 'j':
					MRS_Upper &= 0xFB; // Reset bit 2
					break;
				case 'k':
					MRS_Upper &= 0xF7; // Reset bit 3
					break;
				case 'l':
					MRS_Upper &= 0xEF; // Reset bit 4
					break;
				case 'm':
					MRS_Upper &= 0xDF; // Reset bit 5
					break;
				case 'n':
					MRS_Upper &= 0xBF; // Reset bit 6
					break;
				default:
					
					break;
			}

			serialWrite('\r');
			serialWrite('\n');
		}
		

		//welcomes and prompts user
		menu_display();
		
	}

}



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

//this holds the pattern for an expression
vibration expression[9];
int completed_vibrations;
int completed_events;
int events[18];

//hold the value of serialRead
char selection[5];

selectionIndex = 0;

void MRS_switch(int index, uint8_t turnOn) {
	if(turnOn) {
		switch (index) {
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
			default:
				break;
		}
	}
	else {
		switch (index) {
			case 'A':
                MRS_Lower &= 0xFE; // Reset bit 0
                break;
            case 'B':
                MRS_Lower &= 0xFD; // Reset bit 1
                break;
            case 'C':
                MRS_Lower &= 0xFB; // Reset bit 2
                break;
            case 'D':
                MRS_Lower &= 0xF7; // Reset bit 3
                break;
            case 'E':
                MRS_Lower &= 0xEF; // Reset bit 4
                break;
            case 'F':
                MRS_Lower &= 0xDF; // Reset bit 5
                break;
            case 'G':
                MRS_Lower &= 0xBF; // Reset bit 6
                break;
            case 'H':
                MRS_Upper &= 0xFE; // Reset bit 0
                break;
            case 'I':
                MRS_Upper &= 0xFD; // Reset bit 1
                break;
            case 'J':
                MRS_Upper &= 0xFB; // Reset bit 2
                break;
            case 'K':
                MRS_Upper &= 0xF7; // Reset bit 3
                break;
            case 'L':
                MRS_Upper &= 0xEF; // Reset bit 4
                break;
            case 'M':
                MRS_Upper &= 0xDF; // Reset bit 5
                break;
            case 'N':
                MRS_Upper &= 0xBF; // Reset bit 6
                break;
            default:
                break;

		}
	}
}

ISR(TIMER1_COMPA_vect)
{
	if (completed_vibrations < 9 && completed_events < 18) {
		for (int i = 0; i < 9; i++) {
			if (completed_vibrations < 9 && completed_events < 18) {
				if (events[completed_events] == expression[i].delay) {
					MRS_switch(expression[i].motor.id, 1);
					completed_events++;
					On_Time = (8 * expression[i].on_time);
					Off_Time = (8 * expression[i].off_time);
				}
				else {
					MRS_switch(expression[i].motor.id, 0);
					completed_events++;
				}
				OCR1A = (8 * events[completed_events]);
			}
			else {
				break;
			}
		}
	}
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
		int i;
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

/*******************************************************/
//TODO: Add sorting of event timings to get_expression()
/*******************************************************/
void get_expression() {
	vibration temp;
	vibration sorted[9];
	int i;
	for (i = 0; i < 9; i++) {
		temp = get_vibration(i + 1);
		if (temp.duration != 0) {
			expression[i] = temp;
		}
		else {
			for (int j = i; j < 9; j++) {
				expression[j] = temp;
			}
			break;
		}
	}
	completed_vibrations = 8 - i;
	completed_events = 16 - (2*i);

	for (int k = completed_events; k < 18; k++) {
		events[k]
	}
}

int main () {
	//Turn on global interrupts
	sei();

	//specify all port directions
	data_direction_setup();
	
	//sets up baud rates, Rx, Tx, etc.
	setup_serial();
	

	
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
		get_expression();
	}

}



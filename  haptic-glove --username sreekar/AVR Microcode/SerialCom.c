
#include <avr/io.h> 
//#include <avr/interrupt.h>

#include "SerialCom.h"


void delayLong() {
	unsigned int delayvar;
	delayvar = 0; 
	while (delayvar <=  65500U)		
	{ 
		asm("nop");
		delayvar++;
	} 
}

unsigned char serialCheckRxComplete(void) {
	//return zero if there's nothing to read
	return( UCSR0A & _BV(RXC0));
}

unsigned char serialCheckTxReady(void) {
	//return zero if the transmit register is not ready
	return( UCSR0A & _BV(UDRE0) );
}

unsigned char serialRead(void) {
	//dawdle until we have data to read
	while (serialCheckRxComplete() == 0)
	{;;} 
	return UDR0;
}

void serialWrite(unsigned char DataOut) {
	//dawdle until we can transmit data
	while (serialCheckTxReady() == 0)
	{;;} 
	UDR0 = DataOut;
}

int setup_serial (void) {
	//we just need to set the transmit line to '1'
	//	since a bit value of 1 indicates output
	//	we don't need to set the input because it defaults
	//	to 0. OR-EQUAL is used to prevent overwriting other values
	DDRD |= _BV(DDD1);
	
 	//Set baud rate
	UBRR0H = (unsigned char)(MYUBRR>>8); 
	UBRR0L = (unsigned char) MYUBRR; 
	//Enable receiver and transmitter
	UCSR0B = (1<<RXEN0)|(1<<TXEN0); 
	//Frame format: 8data, No parity, 1stop bit
	return 0;
}

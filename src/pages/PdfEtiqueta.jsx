import React from 'react'
import pdf from "@react-pdf/renderer";
const { Page, Document, Text, View, StyleSheet, Font, ReactPDF} = pdf;

const styles = StyleSheet.create(
{
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
});

const PdfEtiqueta = () => 
(     
      // Create Document Component
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
);

export default PdfEtiqueta
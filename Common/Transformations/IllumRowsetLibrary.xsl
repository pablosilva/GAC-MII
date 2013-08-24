<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" media-type="text/html" encoding="UTF-8"/>
	<xsl:template name="PrintMetaTags">
		<xsl:param name="RefreshRate">0</xsl:param>
		<!--Netscape requires windows-1252
		Use <xsl:output method="html" media-type="text/html" encoding="windows-1252"/> in the xsl to generate
		<META http-equiv="Content-Type" content="text/html; charset=windows-1252"/> in the transformed document.-->
		<META http-equiv="Expires" content="0"/>
		<META http-equiv="Cache-Control" content="no-cache"/>
		<META http-equiv="Pragma" content="no-cache"/>
		<xsl:choose>
			<xsl:when test="$RefreshRate &gt; 0">
				<META http-equiv="Refresh" content="{$RefreshRate}"/>
			</xsl:when>
			<xsl:otherwise>
				<xsl:if test="count(Rowsets/HyperLinks/HyperLink) = 1">
					<META http-equiv="Refresh">
						<xsl:attribute name="content"><xsl:text>5; URL=</xsl:text><xsl:value-of select="Rowsets/HyperLinks/HyperLink/."/></xsl:attribute>
					</META>
				</xsl:if>
			</xsl:otherwise>
		</xsl:choose>
		<META name="palmcomputingplatform" content="true"/>
	</xsl:template>
	<xsl:template name="PrintRowsetStyle">
		<xsl:param name="CSS"/>
		<LINK rel="stylesheet" type="text/css" href="{$CSS}"/>
	</xsl:template>
	<xsl:template name="PrintFatalError">
		<xsl:for-each select="FatalError">
			<table border="1" cellpadding="1">
				<xsl:attribute name="class">DetailTable</xsl:attribute>
				<tr>
					<xsl:attribute name="class">Detail</xsl:attribute>
					<th>
						<xsl:attribute name="class">DetailHeaderData</xsl:attribute>
						<xsl:text>Fatal Error</xsl:text>
					</th>
				</tr>
				<tr>
					<xsl:attribute name="class">Detail</xsl:attribute>
					<td>
						<xsl:attribute name="class">DetailData</xsl:attribute>
						<xsl:value-of select="."/>
					</td>
				</tr>
			</table>
			<p/>
		</xsl:for-each>
	</xsl:template>
	<xsl:template name="PrintHyperLinks">
		<xsl:for-each select="HyperLinks">
			<xsl:for-each select="HyperLink">
				<a>
					<xsl:attribute name="CLASS">DetailHyperLink</xsl:attribute>
					<xsl:attribute name="href"><xsl:value-of select="."/></xsl:attribute>
					<xsl:value-of select="@Label"/>
				</a>
				<p/>
			</xsl:for-each>
		</xsl:for-each>
	</xsl:template>
	<xsl:template name="PrintMessages">
		<xsl:for-each select="Messages">
			<xsl:for-each select="Message">
				<table border="1" cellpadding="1">
					<xsl:attribute name="class">DetailTable</xsl:attribute>
					<tr>
						<xsl:attribute name="class">Detail</xsl:attribute>
						<th>
							<xsl:attribute name="class">DetailHeaderData</xsl:attribute>
							<xsl:text>Message</xsl:text>
						</th>
					</tr>
					<tr>
						<xsl:attribute name="class">Detail</xsl:attribute>
						<td>
							<xsl:attribute name="class">DetailData</xsl:attribute>
							<xsl:value-of select="."/>
						</td>
					</tr>
				</table>
				<p/>
			</xsl:for-each>
		</xsl:for-each>
	</xsl:template>
	<xsl:template name="PrintTitle">
		<xsl:param name="Title"/>
		<xsl:if test="$Title != ''">
			<title>
				<xsl:value-of select="$Title"/>
			</title>
		</xsl:if>
	</xsl:template>
	<xsl:template name="PrintHeader">
		<xsl:param name="HeaderText"/>
		<xsl:if test="$HeaderText != ''">
			<p>
				<xsl:attribute name="class">Header</xsl:attribute>
				<xsl:value-of select="$HeaderText"/>
			</p>
		</xsl:if>
	</xsl:template>
	<xsl:template name="PrintFooter">
		<xsl:param name="FooterText"/>
		<xsl:if test="$FooterText != ''">
			<p>
				<xsl:attribute name="class">Footer</xsl:attribute>
				<xsl:value-of select="$FooterText"/>
			</p>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>
<!-- Stylesheet edited using Stylus Studio - (c)1998-2002 eXcelon Corp. -->

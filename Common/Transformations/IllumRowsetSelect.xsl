<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:include href="/XMII/CM/PEPSICO/Common/Transformations/IllumRowsetLibrary.xsl"/>
	<xsl:param name="SelectName"/>
	<xsl:param name="ListSize">4</xsl:param>
	<xsl:param name="Style"></xsl:param>
	<xsl:param name="MultiSelect">1</xsl:param>
	<xsl:param name="BlankSelectLabel">0</xsl:param>
	<xsl:param name="onChange"/>
	<xsl:template match="/">
		<xsl:for-each select="Rowsets">
			<xsl:call-template name="PrintFatalError"/>
			<xsl:call-template name="PrintMessages"/>
			<xsl:for-each select="Rowset">
				<SELECT NAME="{$SelectName}" ID="{$SelectName}" SIZE="{$ListSize}" STYLE="{$Style}">
					<xsl:if test="$MultiSelect = '1'">
						<xsl:attribute name="MULTIPLE"/>
					</xsl:if>
					<xsl:if test="$onChange != ''">
						<xsl:attribute name="ONCHANGE">
							<xsl:value-of select="$onChange"/>
						</xsl:attribute>
					</xsl:if>
					<xsl:if test="$BlankSelectLabel = '1'">
						<OPTION value="">- Select -</OPTION>
					</xsl:if>
					<xsl:for-each select="Row">
						<OPTION>
							<xsl:for-each select="*">
								<xsl:if test="position() = 1">
									<xsl:attribute name="VALUE">
										<xsl:value-of select="."/>
									</xsl:attribute>
								</xsl:if>
								<xsl:value-of select="."/>
								<xsl:if test="position() != last()">
									<xsl:text> - </xsl:text>
								</xsl:if>
							</xsl:for-each>
						</OPTION>
					</xsl:for-each>
				</SELECT>
			</xsl:for-each>
		</xsl:for-each>
	</xsl:template>
</xsl:stylesheet><!-- Stylesheet edited using Stylus Studio - (c)1998-2002 eXcelon Corp. -->